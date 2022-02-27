<?php
/**
 * Island Counting
 *
 * Create a function that accepts a 2D Array (N x M) and returns the number of Islands
 * An island is one or more adjacent land tiles.
 * A Tile is either 0 => Water, or 1 => Land
 *
 * Example:
 * 4x4 Map
 * 0 0 0 0
 * 0 1 0 0
 * 0 0 1 0
 *
 * Returns
 * 2
 *
 * Example:
 * 5x5 Map
 * 1 1 1 1 1
 * 1 0 0 0 1
 * 1 0 1 0 1
 * 1 0 0 0 1
 * 1 1 1 1 1
 *
 * Returns
 * 2
 */

/**
 * @param array $map
 * @return int
 */
function countIslands(array $map) {
    $count = 0;

    foreach ($map as $y => $y_grid) {
        foreach ($y_grid as $x => $tile) {
            if ($map[$x][$y] == '1') {
                checkTile($map, $x, $y);
                $count++;
            }
        }
    }

    return $count;
}

function checkTile(&$map, $x, $y) {
    if (!isset($map[$x][$y])) {
        return;
    }

    if ($map[$x][$y] == 'V') {
        return;
    } else if ($map[$x][$y] == '0') {
        $map[$x][$y] = 'V';
        return;
    } else {
        $map[$x][$y] = 'V';
        checkTile($map, $x+1,$y);
        checkTile($map, $x-1,$y);
        checkTile($map, $x,$y+1);
        checkTile($map, $x,$y-1);
        return;
    }
}

print countIslands(array(
    array(1,1,1,1,1),
    array(1,0,0,0,1),
    array(1,0,1,0,1),
    array(1,0,0,0,1),
    array(1,1,1,1,1)
));