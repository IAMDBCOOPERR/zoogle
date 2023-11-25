import { NextResponse } from "next/server"
import { ulid } from "ulidx"
import { Pinecone } from "@pinecone-database/pinecone"

export async function POST(request) {
 const { captions } = await request.json()

 const chunkSize = 99
 const finay_vector_data_of_captions = []
 for (let i = 0; i < captions.length; i += chunkSize) {
  const chunk = captions.slice(i, i + chunkSize)
  const og_captions = chunk.map((template) => {
   return {
    ...template,
    caption: template.caption.replace(/,/g, "and") + " from venky movie ",
   }
  })
  const only_captions = og_captions.map((template) => {
   return template.caption.replace(/,/g, "and") + " from venky movie "
  })
  const response = await run("@cf/baai/bge-base-en-v1.5", {
   text: only_captions,
  })

  const output = response.result.data
  const insertData = []
  for (let i = 0; i < chunk.length; i++) {
   insertData.push({
    id: ulid(),
    values: output[i],
    metadata: og_captions[i],
   })
  }
  const pinecone = new Pinecone({
   apiKey: "20e76a9a-59a5-4526-a94c-dd6368a717d1",
   environment: "gcp-starter",
  })
  const index = pinecone.index("templates")
  index.upsert(insertData)
 }
 return NextResponse.json({
  m: finay_vector_data_of_captions,
  sucess: "true",
 })
}
async function run(model, input) {
 const API_TOKEN = "AL4ujRkcgiY1zzPYbaBl1wUEXN8WkVFGDFkzdb7W"
 const response = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/219d896bf5731e21b641c4f0c307a613/ai/run/${model}`,
  {
   headers: { Authorization: `Bearer ${API_TOKEN}` },
   method: "POST",
   body: JSON.stringify(input),
  }
 )
 const result = await response.json()
 return result
}
