import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { query, response } from "express"

export async function POST(request, params) {
 cloudinary.config({
  cloud_name: "dd4dsbaxh",
  api_key: "216675827665393",
  api_secret: "XNXn7HzDy5eEhliSRQK-zJGozzA",
 })
 const { query } = await request.json()
 const cloudinaryImages = await cloudinary.api.resources({
  type: "upload",
  prefix: `movie/${query}`,
  max_results: 500,
 })
 const resources = cloudinaryImages.resources
 const url = resources.map((e) => {
  return e.url
 })
 console.log(url)
 return NextResponse.json({ url, query })
}
