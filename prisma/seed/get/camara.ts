import axios from 'axios';
import { Prisma, Sex } from '@prisma/client';
import parsers from '../../../src/utils/parsers';
import paths from '../files/index.js';


async function saveDeputadosData() {
    const deputados = await getDeputadosFromAPI();
    const deputadosWithData = await getEachDeputadoFromAPI(deputados);

    parsers.json.write(deputadosWithData, paths.json.raw.deputados);
}

async function getDeputadosFromAPI() {
    const url = 'https://dadosabertos.camara.leg.br/api/v2/deputados';
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    const response = await axios.get(url, { headers });
    const deputados = response.data.dados;
    return deputados;
}

async function getEachDeputadoFromAPI(deputados: any[]) {
    const total = deputados.length;
    const start = new Date();

    console.log('entrando no loop');

    for (let i = 0; i < total; i++) {

        const deputado = deputados[i];

        if (deputado.uri) {
            const deputadoUrl = deputado.uri;
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };
            const response = await axios.get(deputadoUrl, { headers });
            const novosDados = response.data.dados;
            if (novosDados) {
                if (i % 25 === 0) {
                    console.log(`${i}/${total}`);
                }
                deputados[i] = { ...deputado, ...novosDados };
            } else {
                console.log('-- could not get data for deputado: ', deputado.nome);
            }
        } else {
            console.log('-- could not get data for deputado: ', deputado.nome);
        }
    }

    console.log('saindo do loop');
    return deputados;
}


async function saveDeputadosAsPeople() {
    const deputadosRaw = parsers.json.read(paths.json.raw.deputados) as {
        date: string,
        data: RawDeputado[]
    };
    const people = [] as Prisma.PersonCreateInput[];

    let index = 0;
    for (const deputado of deputadosRaw.data) {
        people.push(fabricatePoliticalPerson(deputado, index));
        index++;
    }

    parsers.json.write(people, 'deputados_seed');
}

function fabricatePoliticalPerson(deputado: RawDeputado, index: number) : Prisma.PersonCreateInput {
    console.log(index);
    return {
        name: deputado.nome,
        cpf: deputado.cpf,
        birthDate: deputado.dataNascimento ? new Date(deputado.dataNascimento) : null,
        email: deputado.email ? deputado.email : null,
        phone: deputado.ultimoStatus?.gabinete?.telefone ? deputado.ultimoStatus.gabinete.telefone : null,
        sex: deputado.sexo === 'M' ? 'Male' : 'Female',
        voteState: {connect: {
            abbreviation: deputado.ufNascimento ? deputado.ufNascimento : deputado.siglaUf
        }},
        contact: {
            create: {
                phone: deputado.ultimoStatus?.gabinete?.telefone ? deputado.ultimoStatus.gabinete.telefone : null,
                email: deputado.email ? deputado.email : null,
                twitter: deputado.redeSocial?.find(url => {
                    return url.includes('twitter');
                }) || null,
                facebook: deputado.redeSocial?.find(url => {
                    return url.includes('facebook');
                }) || null,
                instagram: deputado.redeSocial?.find(url => {
                    return url.includes('instagram');
                }) || null,
                youtube: deputado.redeSocial?.find(url => {
                    return url.includes('youtube');
                }) || null,
                website: deputado.urlWebsite ? deputado.urlWebsite : null,
            }
        },
        politicianProfile: {
            create: {
                name: deputado.ultimoStatus?.nomeEleitoral || deputado.nome,
                description: '',
                partyAbbreviation: deputado.ultimoStatus?.siglaPartido || deputado.siglaPartido,
                stateAbbreviation: deputado.ultimoStatus?.siglaUf || deputado.siglaUf,
                officialId: String(deputado.id),
                imageUrl: deputado.urlFoto,
            }
        }
    };
}

function listAllPartiesAbbreviations () {

    const deputadosRaw = parsers.json.read(paths.json.raw.deputados) as {
        date: string,
        data: RawDeputado[]
    };
    const parties = [];
    const siglas = {};
    for (const deputado of deputadosRaw.data) {
        if (!siglas[deputado.siglaPartido]) {
            siglas[deputado.siglaPartido] = true;
            parties.push(deputado.siglaPartido);
        }
    }
    parsers.json.write(parties, paths.json.raw.deputados);
}

function listAllStatesAbbreviations () {
    const deputadosRaw = parsers.json.read(paths.json.raw.deputados) as {
        date: string,
        data: RawDeputado[]
    };
    const states = [];
    const siglas = {};
    for (const deputado of deputadosRaw.data) {

        let sigla = deputado.siglaUf;

        if (sigla && !siglas[sigla]) {
            siglas[sigla] = true;
            states.push(sigla);
        }

        sigla = deputado.ufNascimento;

        if (sigla && !siglas[sigla]) {
            siglas[sigla] = true;
            states.push(sigla);
        }

        sigla = deputado.ultimoStatus?.siglaUf;

        if (sigla && !siglas[sigla]) {
            siglas[sigla] = true;
            states.push(sigla);
        }
    }
    parsers.json.write(states, paths.json.raw.deputados);
}


// saveDeputadosData();
// saveDeputadosAsPeople();
// listAllPartiesAbbreviations();
// listAllStatesAbbreviations();



interface RawDeputado {
    "id": number,
    "uri": string,
    "nome": string,
    "siglaPartido": string,
    "uriPartido": string,
    "siglaUf": string,
    "idLegislatura": 56,
    "urlFoto": string,
    "email": string,
    "nomeCivil": string,
    "ultimoStatus": {
        "id": number,
        "uri": string,
        "nome": string,
        "siglaPartido": string,
        "uriPartido": string,
        "siglaUf": string,
        "idLegislatura": number,
        "urlFoto": string,
        "email": string,
        "data": string,
        "nomeEleitoral": string,
        "gabinete": {
            "nome": string,
            "predio": string,
            "sala": string,
            "andar": string,
            "telefone": string,
            "email": string,
        },
        "situacao": string,
        "condicaoEleitoral": string,
        "descricaoStatus": string | null,
    },
    "cpf": string,
    "sexo": string,
    "urlWebsite": string | null,
    "redeSocial": string[],
    "dataNascimento": string,
    "dataFalecimento": string | null,
    "ufNascimento": string,
    "municipioNascimento": string,
    "escolaridade": string,
}

