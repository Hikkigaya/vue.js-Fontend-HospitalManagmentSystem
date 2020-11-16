/**
 * Copyright (c) 2019 @ TylexTech. All rights reserved.
 * @author Muhammad Tayyab <tayyab@tylextech.com>
 */

import Errors from './Errors';
import request  from 'src/utils/request'

/**
 * This class handles form related task
 * like: submit, validate etc
 */
class Form
{
    /**
     * Constructor for the form object accepts object with the keys
     * the form and initializes the form object.
     *
     * @param data
     */
    constructor(data)
    {
        this.originalData = data
        this.formData = new FormData()
        
        for(let field in data)
        {
            this[field]= data[field]
        }
        
        this.errors = new Errors()
        this.isSubmitting = false
    }
    
    /**
     * Resets the form values
     */
    reset()
    {
        for(let field in this.originalData){
            this[field] = this.originalData[field]
        }
        this.formData = new FormData()
        
        this.errors.clear()
    }
    
    /**
     * Return the data in the form
     */
    data()
    {
        let data = {};
        
        for(let property in this.originalData){
            data[property] = this[property]
        }
        
        return data
    }
    
    /**
     * Wrapper around the post request to be sent to the server.
     *
     * @param url
     * @param config
     * @returns {*|Promise<unknown>|Promise}
     */
    post(url,config =null){
        return this.submit('post',url,config)
    }
    
    /**
     * Wrapper around the get for the server
     *
     * @param url
     * @param config
     * @returns {*|Promise<unknown>|Promise}
     */
    get(url,config =null){
        return this.submit('get',url,config)
    }
    
    /**
     * Wrapper for the put request to the server.
     *
     * @param url
     * @param config
     * @returns {*|Promise<unknown>|Promise}
     */
    put(url,config =null){
        this.formData.append('_method', 'PUT')
        return this.submit('post',url,config)
    }
    
    /**
     * Wrapper for the patch request to the server.
     *
     * @param url
     * @param config
     * @returns {*|Promise<unknown>|Promise}
     */
    patch(url,config =null){
        this.formData.append('_method', 'PATCH')
        return this.submit('post',url,config)
    }
    
    /**
     * Wrapper to the delete request for the server
     *
     * @param url
     * @param config
     * @returns {*|Promise<unknown>|Promise}
     */
    delete(url,config =null){
        // this.formData.append('_method', 'PATCH');
        return this.submit('delete',url,config)
    }
    
    /**
     * Returns a object with form's data
     */
    buildFormDataArray() {
        let data = {}
        
        for (let property in this.originalData) {
            data[property] =  this[property]
        }
        
        return data
    }
    
    /**
     * Builds form data to be sent to the server in submit request.
     *
     * @param data
     * @param previousKey
     * @todo To find a better way to incorporate all kids of values upto unlimited levels of arrays
     */
    buildFormData(data, previousKey) {

        if (data instanceof Object) {

            Object.keys(data).forEach(key => {
                const value = data[key]

                if (value instanceof Object && !Array.isArray(value)) {
                    return this.buildFormData(value, key)
                }
                if (previousKey) {
                    key = `${previousKey}[${key}]`
                }
                if (Array.isArray(value)) {
                    value.forEach((val, index) => {
                        this.formData.append(`${key}`, JSON.stringify(val))
                    });
                    // this.formData.append(key, value)
                }
                else {
                    this.formData.append(key, value)
                }
            });
        }
    }
    
    // buildFormData(data, inArray) {
    //     for (let objectData in data) {
    //         if (Array.isArray(data[objectData])) {
    //             if (typeof data[objectData] === 'object') {
    //                 this.buildFormData(data[objectData], true)
    //             }
    //             else {
    //                 this.formData.append(objectData+'[]', data[objectData])
    //             }
    //         } else {
    //             this.formData.append(objectData, data[objectData])
    //         }
    //     }
    // }
    
    // buildFormDataTest(form) {
    //     let data = new FormData();
    //
    //     for(let property in form){
    //         if (Array.isArray(form[property])) {
    //             for(let subProperty in form[property]){
    //                 if (typeof form[property][subProperty] === 'object') {
    //                     for (let objectData in form[property][subProperty]) {
    //                         data.append(property+'['+subProperty+']['+objectData+']', form[property][subProperty][objectData])
    //                     }
    //                 }
    //                 else {
    //                     data.append(property+'[]', form[property][subProperty])
    //                 }
    //             }
    //         }
    //         else {
    //             data.append(property,form[property])
    //         }
    //     }
    //
    //     return data;
    // }
    
    /**
     * This methods sends AJAX request to the server.
     *
     * @param requestType
     * @param url
     * @param config
     * @returns {Promise<unknown>}
     */
    submit(requestType, url,config = null)
    {
        this.isSubmitting = true;
        let dataValues = this.buildFormDataArray()
        this.buildFormData(dataValues)
        
        return new Promise((resolve,reject)=>{
            request[requestType.toLowerCase()](url,this.formData,config)
                .then(response =>{
                    this.onSuccess(response.data)
                    resolve(response.data)
                })
                .catch(error=> {
                    this.isSubmitting = false
                    
                    if (error.response && error.response.status !== 401) {
                        this.onFail(error.response.data)
                    }
                    reject(error.response);
                });
        });
    }
    
    /**
     * If form request is success full this method is called.
     *
     * @param data
     */
    onSuccess(data)
    {
        this.reset()
        this.isSubmitting = false
    }
    
    /**
     * if there is any error from the server then this method os invoked
     * This method registers errors related to fields.
     *
     * @param errors
     */
    onFail(errors)
    {
        this.errors.record(errors)
        this.isSubmitting = false
    }
    
    /**
     * If a field contains any form related validation errors this method
     * clears them.
     *
     * @param event
     */
    clearFormErrorAtField(event){
        this.errors.clear(event.target.name)
    }
}

export default Form;
