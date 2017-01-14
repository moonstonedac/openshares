import assetConstants from "../chain/asset_constants";

export default class AssetUtils {
    
    static getFlagBooleans(mask, isOpenAsset = false) {
        let booleans = {
            charge_market_fee    : false,
            white_list           : false,
            override_authority   : false,
            transfer_restricted  : false,
            disable_force_settle : false,
            global_settle        : false,
            disable_confidential : false,
            delegate_fed_asset    : false,
            council_fed_asset  : false
        }

        if (mask === "all") {
            for (let flag in booleans) {
                if (!isOpenAsset && (assetConstants.uia_permission_mask.indexOf(flag) === -1)) {
                    delete booleans[flag];
                } else {
                    booleans[flag] = true;
                }
            }
            return booleans;
        }

        for (let flag in booleans) {
            if (!isOpenAsset && (assetConstants.uia_permission_mask.indexOf(flag) === -1)) {
                delete booleans[flag];
            } else {
                if (mask & assetConstants.permission_flags[flag]) {
                    booleans[flag] = true;
                }
            } 
        }

        return booleans;
    }

    static getFlags(flagBooleans) {
        let keys = Object.keys(assetConstants.permission_flags);

        let flags = 0;

        keys.forEach(key => {
            if (flagBooleans[key] && key !== "global_settle") {
                flags += assetConstants.permission_flags[key];
            }
        })

        return flags;
    }

    static getPermissions(flagBooleans, isOpenAsset = false) {
        let permissions = isOpenAsset ? Object.keys(assetConstants.permission_flags) : assetConstants.uia_permission_mask;
        let flags = 0;
        permissions.forEach(permission => {
            if (flagBooleans[permission] && permission !== "global_settle") {
                flags += assetConstants.permission_flags[permission];
            }
        })

        if (isOpenAsset) {
            flags += assetConstants.permission_flags["global_settle"];
        }

        return flags;
    }

    static parseDescription(description) {
        let parsed;
        try {
            parsed = JSON.parse(description)
        } catch (error) {
            
        }

        return parsed ? parsed : {main: description};
    }
}
