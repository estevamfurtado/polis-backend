export type DeputadoPerson = {
    name: string
    cpf: string | null
    email: string | null
    birthDate: string | null
    phone: string | null
    sex: 'Male' | 'Female'
    voteState: {connect: {abbreviation: string}}
    contact: {create: Contact}
    politicianProfile: {create: Politician}
}
export type Contact = {
    phone: string | null
    email: string | null
    twitter: string | null
    facebook: string | null
    instagram: string | null
    youtube: string | null
    website: string | null
}
export type Politician = {
    name: string
    description: string
    partyAbbreviation: string
    stateAbbreviation: string
    officialId: string
    imageUrl: string
}

