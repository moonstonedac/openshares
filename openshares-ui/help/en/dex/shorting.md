# Short Selling OpenAssets

In order to increase your exposure to OPS and offer liquidity to OpenAssets, such
as USD, EUR, GOLD, etc., you can go *borrow* this openAsset from the network and
*sell it short*. We will here briefly describe the procedure.

## Borrowing

The OpenShares network is capable of issuing any amount of any OpenAsset and lend
it out to participants given enough collateral.

 * *settlement price*: The price for 1 OPS as it is traded on external exchanges.
 * *maintenance collateral ratio* (MCR): A ratio defined by the delegates as minimum required collateral ratio
 * *maximum short squeeze ratio* (MSQR): A ratio defined by the delegates as to how far shorts are protected against short squeezes
 * *short squeeze protection* (SQP): Defines the most that a margin position will ever be forced to pay to cover 
 * *call price* (CP): The price at which short/borrow positions are margin called

### Margin Call

The OpenShares network is capable of margin calling those positions that do not
have enough collateral to back their borrowed OpenAssets. A margin call will
occur any time the highest bid is less than the *call price* and greater than
*SQP*.
The margin position will be forced to sell its collateral anytime the highest
offer to buy the collateral is less than the call price (x/OPS).

    SQP        = settlement price / MSQR
    call price = DEBT / COLLATERAL * MCR

The margin call will take the collateral, buy shares of borrowed openAsset at
market rates up to the SQP and close the position. The remaining OPS of the
collateral are returned to the customer.

### Settlement

Holders of any openAsset can request a settlement at a *fair price* at any time.
The settlement closes the borrow/short positions with lowest collateral ratio
and sells the collateral for the settlement.

## Selling

After borrowing OpenAssets, they can be sold free at any of the corresponding
markets at any price a buyer is willing to pay. With this step, the
short-selling is now complete and you are short that particular openAsset.

## Updating Collateral Ratio

At any time, the holder of a borrow/short position can modify the collateral
ratio in order to flexibly adjust to market behavior. If the collateral ratio is
increase, an additional amount of OPS is locked as collateral, while reducing
the collateral ratio will require an amount of the corresponding OpenAsset to be
payed back to the network.

## Covering

To close a borrow/short position, one must hold the borrowed amount of that
particular openAsset to hand it over to the OpenShares network. After that, the
OpenAssets are reduced from the corresponding supply and the collateral is
released and given back to its owner.
