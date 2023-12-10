import { NextResponse } from "next/server"

export async function POST(request) {
 const { captions, movie } = await request.json()

 const og_captions = captions.map((template) => {
  return {
   ...template,
   caption:
    template.caption.replace(/,/g, "and") + `from ${movie} movie templates`,
  }
 })

 console.log(og_captions)

 return NextResponse.json({
  m: finay_vector_data_of_captions,
  sucess: "true",
 })
}
