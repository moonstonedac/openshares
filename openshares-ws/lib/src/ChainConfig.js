var _this;

var ecc_config = {
    address_prefix: process.env.npm_config__capricorn_ecc_default_address_prefix || "CAP"
};

module.exports = _this = {
    core_asset: "CORE",
    address_prefix: "CAP",
    expire_in_secs: 15,
    expire_in_secs_proposal: 24 * 60 * 60,
    networks: {
        OpenShares: {
            core_asset: "OPS",
            address_prefix: "OPS",
            chain_id: "cd44c4c2e09b3ff987943cde78e42bd75a5b1c3518c712f8da7d19d3356a36bf"
        }
    },

    /** Set a few properties for known chain IDs. */
    setChainId: function(chain_id) {

        var i, len, network, network_name, ref;
        ref = Object.keys(_this.networks);

        for (i = 0, len = ref.length; i < len; i++) {

            network_name = ref[i];
            network = _this.networks[network_name];

            if (network.chain_id === chain_id) {

                _this.network_name = network_name;

                if (network.address_prefix) {
                    _this.address_prefix = network.address_prefix;
                    ecc_config.address_prefix = network.address_prefix;
                }

                // console.log("INFO    Configured for", network_name, ":", network.core_asset, "\n");

                return {
                    network_name: network_name,
                    network: network
                }
            }
        }

        if (!_this.network_name) {
            console.log("Unknown chain id (this may be a testnet)", chain_id);
        }

    },

    reset: function() {
        _this.core_asset = "CORE";
        _this.address_prefix = "CAP";
        ecc_config.address_prefix = "CAP";
        _this.expire_in_secs = 15;
        _this.expire_in_secs_proposal = 24 * 60 * 60;

        console.log("Chain config reset");
    },

    setPrefix: function(prefix = "CAP") {
        _this.address_prefix = prefix;
        ecc_config.address_prefix = prefix;
    }

}
