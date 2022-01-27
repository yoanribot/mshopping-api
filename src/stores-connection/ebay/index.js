import EbayAuthToken from "./ebay-oauth-token";
import { SCOPES } from "./constants";

export function initEbayConnection() {
  console.log(">>>>>> Init EBAY connection / API");

  const server = "SANDBOX";
  const ebayAuthToken = new EbayAuthToken({
    filePath: "stores-config/ebay.json",
  });

  ebayAuthToken
    .getApplicationToken(server, SCOPES.CLIENT)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(`Error to get Access token :${JSON.stringify(error)}`);
    });

  ebayAuthToken.generateUserAuthorizationUrl(server, Object.values(SCOPES));
}
