<?php
/**
 * Created by PhpStorm.
 * User: Glenn
 * Date: 2016-09-09
 * Time: 10:31 AM
 */

//Implement a binary tree

class Node {
    protected $data;
    protected $left;
    protected $right;

    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * @return mixed
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * @param mixed $data
     */
    public function setData($data)
    {
        $this->data = $data;
    }

    /**
     * @return Node
     */
    public function getLeft()
    {
        return $this->left;
    }

    /**
     * @param Node $left
     */
    public function setLeft($left)
    {
        $this->left = $left;
    }

    /**
     * @return Node
     */
    public function getRight()
    {
        return $this->right;
    }

    /**
     * @param Node $right
     */
    public function setRight($right)
    {
        $this->right = $right;
    }

    /**
     * @param $node Node
     * @param $data
     *
     * @return Node
     */
    public function insert($node, $data) {
        if ($node == null) {
            return new Node($data);
        } else {
            if ($data <= $node->getData()) {
                $node->left = $this->insert($node->left, $data);
            } else {
                $node->right = $this->insert($node->right, $data);
            }
            return $node;
        }
    }
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