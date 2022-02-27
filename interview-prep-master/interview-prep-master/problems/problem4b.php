<?php
//Implement a binary tree in php

interface NodeInterface {

    public function getData();
    public function setData($data);

    public function getLeft();
    public function setLeft($left);


    public function getRight();
    public function setRight($right);

    public function insert($node, $data);

    //Returns the the number of elements in a tree
    public function size();

    //Returns the max-depth of a tree
    public function maxDepth();

    //Min value of tree
    public function minValue();

    //Max value of the tree
    public function maxValue();
}

//Step 1.
$node = new Node(3);
$node = $node->insert($node, 2);
$node = $node->insert($node, 1);
$node = $node->insert($node, 4);
$node = $node->insert($node, 5);

print $node->size(); //3
print $node->maxDepth(); //3
print $node->minValue(); //1
print $node->maxValue(); //5