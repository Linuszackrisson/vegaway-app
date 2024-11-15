export const getAuthHeaders = (): { [key: string]: string } | null => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    console.warn("No access token found in localStorage");
    return null; // Or you can throw an error if needed
  }

  return {
    "x-cognito-auth": accessToken,
  };
};

/* 
Författare: Isak

Utility funktion som har boilerplate för att hämta samta inkludera access token i request headers
*/
