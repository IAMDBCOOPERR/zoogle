import { NextRequest, NextResponse } from "next/server"
import { Pinecone } from "@pinecone-database/pinecone"
import fs from "fs/promises"
export async function GET(request, { params }) {
 console.log(params)
 const { id } = params
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
 const response = await run("@cf/baai/bge-base-en-v1.5", {
  text: id,
 })
 const output = new Array(768).fill(0)
 const pinecone = new Pinecone({
  apiKey: "20e76a9a-59a5-4526-a94c-dd6368a717d1",
  environment: "gcp-starter",
 })
 const index = pinecone.index("templates")
 const final_data = await index.query({
  vector: output,
  filter: { movie: { $eq: "venky" } },
  topK: 1000,
  includeMetadata: true,
 })
 var final_dataa = final_data.matches
 var data = final_dataa.map((e) => e.metadata)
 console.log(data)

 return NextResponse.json({
  data,
 })
}
