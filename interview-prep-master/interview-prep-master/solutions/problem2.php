<?php
/**
 * Write an efficient function that takes Stock prices from yesterday as a 1-D array and returns the best profit you
 * could have made from 1 purchase and 1 sale of 1 Apple stock yesterday
 *
 * Example
 * array(10, 7, 5, 8, 11, 9)
 *
 * Returns
 * 6
 *
 * You buy 1 share @ 5
 * You sell that share @ 11
 * 11 - 5 => $6 profit
 */

function getMaxProfit(array $stockPricesYesterday) {

    // make sure we have at least 2 prices
    if (count($stockPricesYesterday) < 2) {
        return 0;
    }

    // we'll greedily update minPrice and maxProfit, so we initialize
    // them to the first price and the first possible profit
    $minPrice = $stockPricesYesterday[0];
    $maxProfit = $stockPricesYesterday[1] - $stockPricesYesterday[0];

    // start at the second (index 1) time
    // we can't sell at the first time, since we must buy first,
    // and we can't buy and sell at the same time!
    // if we started at index 0, we'd try to buy /and/ sell at time 0.
    // this would give a profit of 0, which is a problem if our
    // maxProfit is supposed to be /negative/--we'd return 0!
    for ($i = 1; $i < count($stockPricesYesterday); $i++) {
        $currentPrice = $stockPricesYesterday[$i];

        // see what our profit would be if we bought at the
        // min price and sold at the current price
        $potentialProfit = $currentPrice - $minPrice;

        // update maxProfit if we can do better
        $maxProfit = max($maxProfit, $potentialProfit);

        // update minPrice so it's always
        // the lowest price we've seen so far
        $minPrice = min($minPrice, $currentPrice);
    }

    if ($maxProfit > 0) {
        return $maxProfit;
    } else {
        return 0;
    }
}

print getMaxProfit(array(10, 7, 5, 8, 11, 9));