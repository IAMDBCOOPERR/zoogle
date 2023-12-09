import { NextRequest, NextResponse } from "next/server"
import { Pinecone } from "@pinecone-database/pinecone"

export async function POST(response) {
 const pinecone = new Pinecone({
  apiKey: "20e76a9a-59a5-4526-a94c-dd6368a717d1",
  environment: "gcp-starter",
 })

 const { query } = await response.json()

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
