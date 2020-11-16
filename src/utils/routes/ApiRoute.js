/*
 * Copyright (c) 2019 @ TylexTech. All rights reserved.
 */

/**
 * @author Muhammad Tayyab <tayyab@tylextech.com>
 */

/**
 * Class for data structure of api routes for application
 */
class ApiRoute {
    
    /**
     * constructor to initialize the class
     *
     * @param data
     */
    constructor (data) {
        this.originalData = data;
    
        for(let field in data)
        {
            this[field]= data[field];
        }
    }
}

export default ApiRoute

