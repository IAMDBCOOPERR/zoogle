import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(response) {
 console.log("hi")
 const { query } = await response.json()
 const finaldata =
  await sql`SELECT image_link, caption, caption <->> ${query} AS dist
  FROM templates
  ORDER BY dist LIMIT 10;`
 const data = finaldata.rows
 console.log(data)

 return NextResponse.json(data)
}
