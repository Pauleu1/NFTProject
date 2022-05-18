"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KmsAuthorizerSigner = void 0;
const fcl = __importStar(require("@onflow/fcl"));
const signer_1 = require("fcl-kms-authorizer/dist/signer");
var KEY_ID_ITERABLE = 0;
class KmsAuthorizerSigner {
    constructor(kmsOptions, keyId) {
        this.signer = new signer_1.Signer(kmsOptions, keyId);
    }
    async getPublicKey() {
        return await this.signer.getPublicKey();
    }
    async getFlowPublicKey() {
        return await this.signer.getFlowPublicKey();
    }
    authorize(fromAddress) {
        if (KEY_ID_ITERABLE >= 20) {
            KEY_ID_ITERABLE = 0
        } else {
            KEY_ID_ITERABLE++;
        }
        console.log(KEY_ID_ITERABLE)
        return async (account = {}) => {
            return {
                ...account,
                tempId: [fromAddress, KEY_ID_ITERABLE].join("-"),
                addr: fcl.sansPrefix(fromAddress),
                keyId: Number(KEY_ID_ITERABLE),
                resolve: null,
                signingFunction: async (data) => {
                    return {
                        addr: fcl.withPrefix(fromAddress),
                        keyId: Number(KEY_ID_ITERABLE),
                        signature: await this.signer.sign(data.message)
                    };
                }
            };
        };
    }
    ;
    async getAccount(address) {
        const { account } = await fcl.send([fcl.getAccount(address)]);
        return account;
    }
    ;
}
exports.KmsAuthorizerSigner = KmsAuthorizerSigner;
//# sourceMappingURL=authorizer.js.map
