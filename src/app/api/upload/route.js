import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(request) {
 const { captions, movie } = await request.json()

 const og_captions = captions.map((template) => {
  return {
   ...template,
   caption:
    template.caption.replace(/,/g, "and") + `from ${movie} movie templates`,
  }
 })

 for (data of og_captions) {
  await sql`INSERT INTO TEMPLATES (movie,image_link,caption) VALUES (${data.movie}, ${data.url}, ${data.caption})`
 }
 return NextResponse.json({
  m: finay_vector_data_of_captions,
  sucess: "true",
 })
}
