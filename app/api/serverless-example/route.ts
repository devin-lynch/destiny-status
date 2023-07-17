import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const fetchMilestones = async () => {
    const response = await fetch(
      "https://www.bungie.net/platform/User/Search/GlobalName/0/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": `${process.env.REACT_APP_DESTINY_API_KEY}`,
        },
        body: JSON.stringify({
          displayNamePrefix: "Datto",
        }),
      }
    );
    const data = await response.json();
    return data.Response;
  };

  const apiMilestoneResponse = await fetchMilestones();

  return NextResponse.json(
    {
      body: apiMilestoneResponse,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    {
      status: 200,
    }
  );
}
