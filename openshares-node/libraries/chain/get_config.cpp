/*
 * Copyright (c) 2015 Cryptonomex, Inc., and contributors.
 *
 * The MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

#include <capricorn/chain/get_config.hpp>
#include <capricorn/chain/config.hpp>
#include <capricorn/chain/protocol/types.hpp>

namespace capricorn { namespace chain {

fc::variant_object get_config()
{
   fc::mutable_variant_object result;

   result[ "CAPRICORN_SYMBOL" ] = CAPRICORN_SYMBOL;
   result[ "CAPRICORN_ADDRESS_PREFIX" ] = CAPRICORN_ADDRESS_PREFIX;
   result[ "CAPRICORN_MIN_ACCOUNT_NAME_LENGTH" ] = CAPRICORN_MIN_ACCOUNT_NAME_LENGTH;
   result[ "CAPRICORN_MAX_ACCOUNT_NAME_LENGTH" ] = CAPRICORN_MAX_ACCOUNT_NAME_LENGTH;
   result[ "CAPRICORN_MIN_ASSET_SYMBOL_LENGTH" ] = CAPRICORN_MIN_ASSET_SYMBOL_LENGTH;
   result[ "CAPRICORN_MAX_ASSET_SYMBOL_LENGTH" ] = CAPRICORN_MAX_ASSET_SYMBOL_LENGTH;
   result[ "CAPRICORN_MAX_SHARE_SUPPLY" ] = CAPRICORN_MAX_SHARE_SUPPLY;
   result[ "CAPRICORN_MAX_PAY_RATE" ] = CAPRICORN_MAX_PAY_RATE;
   result[ "CAPRICORN_MAX_SIG_CHECK_DEPTH" ] = CAPRICORN_MAX_SIG_CHECK_DEPTH;
   result[ "CAPRICORN_MIN_TRANSACTION_SIZE_LIMIT" ] = CAPRICORN_MIN_TRANSACTION_SIZE_LIMIT;
   result[ "CAPRICORN_MIN_BLOCK_INTERVAL" ] = CAPRICORN_MIN_BLOCK_INTERVAL;
   result[ "CAPRICORN_MAX_BLOCK_INTERVAL" ] = CAPRICORN_MAX_BLOCK_INTERVAL;
   result[ "CAPRICORN_DEFAULT_BLOCK_INTERVAL" ] = CAPRICORN_DEFAULT_BLOCK_INTERVAL;
   result[ "CAPRICORN_DEFAULT_MAX_TRANSACTION_SIZE" ] = CAPRICORN_DEFAULT_MAX_TRANSACTION_SIZE;
   result[ "CAPRICORN_DEFAULT_MAX_BLOCK_SIZE" ] = CAPRICORN_DEFAULT_MAX_BLOCK_SIZE;
   result[ "CAPRICORN_DEFAULT_MAX_TIME_UNTIL_EXPIRATION" ] = CAPRICORN_DEFAULT_MAX_TIME_UNTIL_EXPIRATION;
   result[ "CAPRICORN_DEFAULT_MAINTENANCE_INTERVAL" ] = CAPRICORN_DEFAULT_MAINTENANCE_INTERVAL;
   result[ "CAPRICORN_DEFAULT_MAINTENANCE_SKIP_SLOTS" ] = CAPRICORN_DEFAULT_MAINTENANCE_SKIP_SLOTS;
   result[ "CAPRICORN_MIN_UNDO_HISTORY" ] = CAPRICORN_MIN_UNDO_HISTORY;
   result[ "CAPRICORN_MAX_UNDO_HISTORY" ] = CAPRICORN_MAX_UNDO_HISTORY;
   result[ "CAPRICORN_MIN_BLOCK_SIZE_LIMIT" ] = CAPRICORN_MIN_BLOCK_SIZE_LIMIT;
   result[ "CAPRICORN_MIN_TRANSACTION_EXPIRATION_LIMIT" ] = CAPRICORN_MIN_TRANSACTION_EXPIRATION_LIMIT;
   result[ "CAPRICORN_BLOCKCHAIN_PRECISION" ] = CAPRICORN_BLOCKCHAIN_PRECISION;
   result[ "CAPRICORN_BLOCKCHAIN_PRECISION_DIGITS" ] = CAPRICORN_BLOCKCHAIN_PRECISION_DIGITS;
   result[ "CAPRICORN_DEFAULT_TRANSFER_FEE" ] = CAPRICORN_DEFAULT_TRANSFER_FEE;
   result[ "CAPRICORN_MAX_INSTANCE_ID" ] = CAPRICORN_MAX_INSTANCE_ID;
   result[ "CAPRICORN_100_PERCENT" ] = CAPRICORN_100_PERCENT;
   result[ "CAPRICORN_1_PERCENT" ] = CAPRICORN_1_PERCENT;
   result[ "CAPRICORN_MAX_MARKET_FEE_PERCENT" ] = CAPRICORN_MAX_MARKET_FEE_PERCENT;
   result[ "CAPRICORN_DEFAULT_FORCE_SETTLEMENT_DELAY" ] = CAPRICORN_DEFAULT_FORCE_SETTLEMENT_DELAY;
   result[ "CAPRICORN_DEFAULT_FORCE_SETTLEMENT_OFFSET" ] = CAPRICORN_DEFAULT_FORCE_SETTLEMENT_OFFSET;
   result[ "CAPRICORN_DEFAULT_FORCE_SETTLEMENT_MAX_VOLUME" ] = CAPRICORN_DEFAULT_FORCE_SETTLEMENT_MAX_VOLUME;
   result[ "CAPRICORN_DEFAULT_PRICE_FEED_LIFETIME" ] = CAPRICORN_DEFAULT_PRICE_FEED_LIFETIME;
   result[ "CAPRICORN_MAX_FEED_PRODUCERS" ] = CAPRICORN_MAX_FEED_PRODUCERS;
   result[ "CAPRICORN_DEFAULT_MAX_AUTHORITY_MEMBERSHIP" ] = CAPRICORN_DEFAULT_MAX_AUTHORITY_MEMBERSHIP;
   result[ "CAPRICORN_DEFAULT_MAX_ASSET_WHITELIST_AUTHORITIES" ] = CAPRICORN_DEFAULT_MAX_ASSET_WHITELIST_AUTHORITIES;
   result[ "CAPRICORN_DEFAULT_MAX_ASSET_FEED_PUBLISHERS" ] = CAPRICORN_DEFAULT_MAX_ASSET_FEED_PUBLISHERS;
   result[ "CAPRICORN_COLLATERAL_RATIO_DENOM" ] = CAPRICORN_COLLATERAL_RATIO_DENOM;
   result[ "CAPRICORN_MIN_COLLATERAL_RATIO" ] = CAPRICORN_MIN_COLLATERAL_RATIO;
   result[ "CAPRICORN_MAX_COLLATERAL_RATIO" ] = CAPRICORN_MAX_COLLATERAL_RATIO;
   result[ "CAPRICORN_DEFAULT_MAINTENANCE_COLLATERAL_RATIO" ] = CAPRICORN_DEFAULT_MAINTENANCE_COLLATERAL_RATIO;
   result[ "CAPRICORN_DEFAULT_MAX_SHORT_SQUEEZE_RATIO" ] = CAPRICORN_DEFAULT_MAX_SHORT_SQUEEZE_RATIO;
   result[ "CAPRICORN_DEFAULT_MARGIN_PERIOD_SEC" ] = CAPRICORN_DEFAULT_MARGIN_PERIOD_SEC;
   result[ "CAPRICORN_DEFAULT_MAX_DELEGATES" ] = CAPRICORN_DEFAULT_MAX_DELEGATES;
   result[ "CAPRICORN_DEFAULT_MAX_COUNCIL" ] = CAPRICORN_DEFAULT_MAX_COUNCIL;
   result[ "CAPRICORN_DEFAULT_MAX_PROPOSAL_LIFETIME_SEC" ] = CAPRICORN_DEFAULT_MAX_PROPOSAL_LIFETIME_SEC;
   result[ "CAPRICORN_DEFAULT_COUNCIL_PROPOSAL_REVIEW_PERIOD_SEC" ] = CAPRICORN_DEFAULT_COUNCIL_PROPOSAL_REVIEW_PERIOD_SEC;
   result[ "CAPRICORN_DEFAULT_NETWORK_PERCENT_OF_FEE" ] = CAPRICORN_DEFAULT_NETWORK_PERCENT_OF_FEE;
   result[ "CAPRICORN_DEFAULT_LIFETIME_REFERRER_PERCENT_OF_FEE" ] = CAPRICORN_DEFAULT_LIFETIME_REFERRER_PERCENT_OF_FEE;
   result[ "CAPRICORN_DEFAULT_MAX_BULK_DISCOUNT_PERCENT" ] = CAPRICORN_DEFAULT_MAX_BULK_DISCOUNT_PERCENT;
   result[ "CAPRICORN_DEFAULT_BULK_DISCOUNT_THRESHOLD_MIN" ] = CAPRICORN_DEFAULT_BULK_DISCOUNT_THRESHOLD_MIN;
   result[ "CAPRICORN_DEFAULT_BULK_DISCOUNT_THRESHOLD_MAX" ] = CAPRICORN_DEFAULT_BULK_DISCOUNT_THRESHOLD_MAX;
   result[ "CAPRICORN_DEFAULT_CASHBACK_VESTING_PERIOD_SEC" ] = CAPRICORN_DEFAULT_CASHBACK_VESTING_PERIOD_SEC;
   result[ "CAPRICORN_DEFAULT_CASHBACK_VESTING_THRESHOLD" ] = CAPRICORN_DEFAULT_CASHBACK_VESTING_THRESHOLD;
   result[ "CAPRICORN_DEFAULT_BURN_PERCENT_OF_FEE" ] = CAPRICORN_DEFAULT_BURN_PERCENT_OF_FEE;
   result[ "CAPRICORN_DELEGATE_PAY_PERCENT_PRECISION" ] = CAPRICORN_DELEGATE_PAY_PERCENT_PRECISION;
   result[ "CAPRICORN_DEFAULT_MAX_ASSERT_OPCODE" ] = CAPRICORN_DEFAULT_MAX_ASSERT_OPCODE;
   result[ "CAPRICORN_DEFAULT_FEE_LIQUIDATION_THRESHOLD" ] = CAPRICORN_DEFAULT_FEE_LIQUIDATION_THRESHOLD;
   result[ "CAPRICORN_DEFAULT_ACCOUNTS_PER_FEE_SCALE" ] = CAPRICORN_DEFAULT_ACCOUNTS_PER_FEE_SCALE;
   result[ "CAPRICORN_DEFAULT_ACCOUNT_FEE_SCALE_BITSHIFTS" ] = CAPRICORN_DEFAULT_ACCOUNT_FEE_SCALE_BITSHIFTS;
   result[ "CAPRICORN_MAX_WORKER_NAME_LENGTH" ] = CAPRICORN_MAX_WORKER_NAME_LENGTH;
   result[ "CAPRICORN_MAX_URL_LENGTH" ] = CAPRICORN_MAX_URL_LENGTH;
   result[ "CAPRICORN_NEAR_SCHEDULE_CTR_IV" ] = CAPRICORN_NEAR_SCHEDULE_CTR_IV;
   result[ "CAPRICORN_FAR_SCHEDULE_CTR_IV" ] = CAPRICORN_FAR_SCHEDULE_CTR_IV;
   result[ "CAPRICORN_CORE_ASSET_CYCLE_RATE" ] = CAPRICORN_CORE_ASSET_CYCLE_RATE;
   result[ "CAPRICORN_CORE_ASSET_CYCLE_RATE_BITS" ] = CAPRICORN_CORE_ASSET_CYCLE_RATE_BITS;
   result[ "CAPRICORN_DEFAULT_DELEGATE_PAY_PER_BLOCK" ] = CAPRICORN_DEFAULT_DELEGATE_PAY_PER_BLOCK;
   result[ "CAPRICORN_DEFAULT_DELEGATE_PAY_VESTING_SECONDS" ] = CAPRICORN_DEFAULT_DELEGATE_PAY_VESTING_SECONDS;
   result[ "CAPRICORN_DEFAULT_WORKER_BUDGET_PER_DAY" ] = CAPRICORN_DEFAULT_WORKER_BUDGET_PER_DAY;
   result[ "CAPRICORN_MAX_INTEREST_APR" ] = CAPRICORN_MAX_INTEREST_APR;
   result[ "CAPRICORN_COUNCIL_ACCOUNT" ] = CAPRICORN_COUNCIL_ACCOUNT;
   result[ "CAPRICORN_DELEGATE_ACCOUNT" ] = CAPRICORN_DELEGATE_ACCOUNT;
   result[ "CAPRICORN_RELAXED_COUNCIL_ACCOUNT" ] = CAPRICORN_RELAXED_COUNCIL_ACCOUNT;
   result[ "CAPRICORN_NULL_ACCOUNT" ] = CAPRICORN_NULL_ACCOUNT;
   result[ "CAPRICORN_TEMP_ACCOUNT" ] = CAPRICORN_TEMP_ACCOUNT;

   return result;
}

} } // capricorn::chain
