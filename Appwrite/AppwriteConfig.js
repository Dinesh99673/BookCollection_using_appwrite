import React from 'react'
import { Client , Databases , Account } from 'appwrite'
import config from './config';

const client = new Client();

client.setEndpoint(config.ApperiteUrl).setProject(config.ApperiteProjectId)

export const  account = new Account(client)


export const database = new Databases(client,config.ApperiteDatabaseId)