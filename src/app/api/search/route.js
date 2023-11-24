import { NextRequest, NextResponse } from "next/server"
import { Pinecone } from "@pinecone-database/pinecone"

export async function POST(response) {
 const pinecone = new Pinecone({
  apiKey: "20e76a9a-59a5-4526-a94c-dd6368a717d1",
  environment: "gcp-starter",
 })

 const { query } = await response.json()

 const index = pinecone.index("templates")
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

 // Can be a string or array of strings]
 const stories = [query]

 const finaldata = await run("@cf/baai/bge-base-en-v1.5", {
  text: stories,
 }).then((response) => {
  const data = JSON.stringify(response)
  const d = JSON.parse(data)
  async function r(d) {
   const queryResponse = await index.query({
    vector: d.result.data[0],
    topK: 10,
    includeValues: true,
    includeMetadata: true,
   })
   return queryResponse.matches
  }
  const finaldata = r(d)
  return finaldata
 })
 return NextResponse.json(finaldata)
}
