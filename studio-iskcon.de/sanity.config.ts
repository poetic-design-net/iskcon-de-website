import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'
import {structure} from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'ISKCON.de',

  projectId: 'cbaalziw',
  dataset: 'production',
  
  basePath: '/studio',

  plugins: [
    structureTool({
      structure
    }), 
    visionTool(), 
    media()
  ],

  schema: {
    types: schemaTypes,
  },
})

