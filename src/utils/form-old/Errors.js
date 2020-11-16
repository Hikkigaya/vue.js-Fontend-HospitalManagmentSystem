/**
 * Copyright (c) 2019 @ TylexTech. All rights reserved.
 *
 * @author Muhammad Tayyab <tayyab@tylextech.com>
 */

/**
 * Handles forms related errors like:
 * displaying errors, record, remove.
 */
class Errors{
    
    /**
     * Initializes errors object.
     */
    constructor(){
        this.errors = {};
    }
    
    /**
     * Returns first array for a specific field
     *
     * @param field
     * @returns {*}
     */
    get(field){
        if(this.errors[field]){
            return this.errors[field][0];
        }
    }
    
    /**
     * To record all of the arrays from the AJAX request.
     *
     * @param errors
     */
    record(errors){
        this.errors = errors;
    }
    
    /**
     * Returns a boolean telling if error for a specific field exists or not.
     *
     * @param field
     * @returns {boolean}
     */
    has(field){
        return this.errors.hasOwnProperty(field);
    }
    
    /**
     * Clears error for a specific field.
     *
     * @param field
     */
    clear(field){
        if(field) {
            delete this.errors[field];
        }
        else {
            this.errors = {};
        }
    }
    
    /**
     * This returns a boolean if there is any error in errors.
     *
     * @returns {boolean}
     */
    any(){
        return Object.keys(this.errors).length > 0;
    }
}

export default Errors;

