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
}

//Step 1.
$node = new Node(1);
$node = $node->insert($node, 2);
print $node->getRight()->getData() . "\n"; //should be 2
$node = $node->insert($node, 0);
print $node->getLeft()->getData() . "\n"; //should be 0
$node = $node->insert($node, 3);
print $node->getRight()->getData() . "\n"; //should be 2
print $node->getRight()->getRight()->getData() . "\n"; //should be 3