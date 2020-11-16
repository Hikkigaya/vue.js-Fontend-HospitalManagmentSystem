/*
 * Copyright (c) 2019 @TylexTech All Rights Reserved.
 */


export function getCompanyTypes (state) {
    return state.companyTypes;
}

export function getCompanyTypesSelectValues (state) {
    return state.companyTypes.map(
        (companyType) => {
            return {
                value: companyType.id,
                label: companyType.name
            }
        }
    )
}

export function getCompanies (state) {
    return state.companies;
}

export function getCompaniesSelectValues (state) {
    return state.companies.map(
        (company) => {
            return {
                value: company.id,
                label: company.name
            }
        }
    )
}

