module.exports.PAYLOAD_STATE = "state";
module.exports.PAYLOAD_REFRESH_TOKEN = "refresh_token";

// HTTP Header Constants
module.exports.HEADER_CONTENT_TYPE = "application/x-www-form-urlencoded";
module.exports.HEADER_PREFIX_BASIC = "Basic ";
module.exports.HEADER_AUTHORIZATION = "Authorization";

// HTTP Request
module.exports.PAYLOAD_VALUE_CLIENT_CREDENTIALS = "client_credentials";
module.exports.PAYLOAD_VALUE_AUTHORIZATION_CODE = "authorization_code";
module.exports.PAYLOAD_REFRESH_TOKEN = "refresh_token";
module.exports.PAYLOAD_STATE = "state";

// Web End point
module.exports.OAUTHENVIRONMENT_WEBENDPOINT_PRODUCTION =
  "https://auth.ebay.com/oauth2/authorize";
module.exports.OAUTHENVIRONMENT_WEBENDPOINT_SANDBOX =
  "https://auth.sandbox.ebay.com/oauth2/authorize";

// API End Point
module.exports.OAUTHENVIRONMENT_APIENDPOINT_SANDBOX =
  "https://api.sandbox.ebay.com/identity/v1/oauth2/token";
module.exports.OAUTHENVIRONMENT_APIENDPOINT_PRODUCTION =
  "https://api.ebay.com/identity/v1/oauth2/token";

// Scopes
module.exports.CLIENT_CRED_SCOPE = "https://api.ebay.com/oauth/api_scope";

// Environments
module.exports.PROD_ENV = "PRODUCTION";
module.exports.SANDBOX_ENV = "SANDBOX";

module.exports.SCOPES = {
  CLIENT: "https://api.ebay.com/oauth/api_scope",
  SELL_MARKETING_READONLY:
    "https://api.ebay.com/oauth/api_scope/sell.marketing.readonly",
  SELL_MARKETING: "https://api.ebay.com/oauth/api_scope/sell.marketing",
  SELL_INVENTORY_READONLY:
    "https://api.ebay.com/oauth/api_scope/sell.inventory.readonly",
  SELL_INVENTORY: "https://api.ebay.com/oauth/api_scope/sell.inventory",
  SELL_ACCOUNT_READONLY:
    "https://api.ebay.com/oauth/api_scope/sell.account.readonly",
  SELL_ACCOUNT: "https://api.ebay.com/oauth/api_scope/sell.account",
  SELL_FULFILLMENT_READONLY:
    "https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly",
  SELL_FULFILLMENT: "https://api.ebay.com/oauth/api_scope/sell.fulfillment",
};
