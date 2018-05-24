import fetch from "isomorphic-fetch";

export async function request(url){
  const response = await fetch(url); 
  const json = await response.json();
  return json;
}