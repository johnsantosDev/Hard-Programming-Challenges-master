<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Class Basics</title>
</head>
<body>
<?php
/*

5) Class basics (PHP)
Write a basic 'animal' class that includes the properties:  'color', 'height', 'number_of_legs', 'latin_name', and 'number_of_offspring'. 
Extend the class for five animals (your choice).

6) Class extras (PHP)
Add a method 'Create_offspring()' that returns a random array of offspring between 1 and 10.
Add a method 'Get_parent()' that returns the parent of any of the offspring.
Add a method 'Get_children()' that returns all the offspring of a particular animal.
Add a method 'Get_number_of_descendants()' that returns a total count of all descendants.

7) Test case (PHP)
Write a system to test #6.


*/
class Animal {
  public $color;
  public $height;
  public $number_of_legs;
  public $latin_name;
  public $number_of_offspring;
  
  //THis method generates a random array from 1-10 and fills the array up randomly with animals, in this case offspring
  function create_offspring()
  {
	  $number_of_offspring=rand(1,10);
	  $offspringArray=array($number_of_offspring);
	  for($i=0; $i<=$number_of_offspring; $i++)
	  {
		  	$animal=rand(1,5);
			if($animal==1)
			{
				$offspringArray[$i]="Cheetah";
			}
			if($animal==2)
			{
				$offspringArray[$i]="Dog";
			}
			if($animal==3)
			{
				$offspringArray[$i]="Cat";
			}
			if($animal==4)
			{
				$offspringArray[$i]="Bat";
			}
			if($animal==5)
			{
				$offspringArray[$i]="Snake";
			}
	  }
	  return $offspringArray;
  }
  //Since the offspring will be the same species as that of parent it will return the name of the offspring species which is the same as that of the parent
  function get_parent($pos,$offspringArray)
  {
	  if(isset($offspringArray[$pos]))
	  {
	  return $offspringArray[$pos];
	  }
	  else
	  {
		return "Sorry invalid animal index"  ;
	  }
  }
  
  //Given a parent $animal and passing in the $offspringArray, this method checks to see the number of offspring of the particular parent in the array and if there are instances that is saved into an array and returned. If no instances are found, a simple string is returned.
  function get_children($animal,$offspringArray)
  {
	  $j=0;
	  $outOffspring= array();
	  for($i=0;$i<count($offspringArray);$i++)
	  {
		  if($animal==$offspringArray[$i])
		  {	  
			  $outOffspring[$j]=$offspringArray[$i];
			  $j++;
		  }
	  }
	  if(count( $outOffspring)>0)
	  {
		return $outOffspring;
	  }
	  else
	  {
		return "Child not found";
	  }
  }
  
  //A little ambiguity as of what has been asked.
  //My interpretation- Return the number of offspring, i.e. the decendents for each species.
  function get_number_of_descendants($offspringArray)
  {
	  $count_cheetah=0;
	  $count_dog=0;
	  $count_cat=0;
	  $count_bat=0;
	  $count_snake=0;
	  for($i=0; $i<count($offspringArray); $i++)
	  {
			if($offspringArray[$i]=="Cheetah") 
			{
				$count_cheetah++;
			}
			if($offspringArray[$i]=="Dog") 
			{
				$count_dog++;
			}
			if($offspringArray[$i]=="Cat") 
			{
				$count_cat++;
			}
			if($offspringArray[$i]=="Bat") 
			{
				$count_bat++;
			}
			if($offspringArray[$i]=="Snake") 
			{
				$count_snake++;
			}
	  }
	  return "Number of Cheetah: $count_cheetah <br/>Number of Dogs: $count_dog <br/>Number of Cats: $count_cat <br/>Number of Bats: $count_bat <br/>Number of snake: $count_snake <br/>";
  }
}


class Cheetah extends Animal{
	public $color="Spotted";
	public $height="6ft";
	public $number_of_legs="4";
	public $latin_name="Cheetaeh";
	public $number_of_offspring="3";
	function showVar()
	{
		return $this.$color;	
	}
	
}
class Dog extends Animal{
	public $color="Brown";
	public $height="5ft";
	public $number_of_legs="4";
	public $latin_name="Dogae";
	public $number_of_offspring="7";
}
class Cat extends Animal{
	public $color="spotted brown, white and black";
	public $height="2ft";
	public $number_of_legs="4";
	public $latin_name="Kittae";
	public $number_of_offspring="5";
}
class Bat extends Animal{
	public $color="black";
	public $height="1ft";
	public $number_of_legs="2";
	public $latin_name="Kittae";
	public $number_of_offspring="5";
}
class Snake extends Animal{
	public $color="Green";
	public $height="8ft";
	public $number_of_legs="0";
	public $latin_name="Snakaey";
	public $number_of_offspring="10";
}

$c=new Animal();
$offspringArray=$c->create_offspring();
$childIndex=5;
$Parent= $c->get_parent($childIndex,$offspringArray);
$animal="Cheetah";
$Children= $c->get_children($animal,$offspringArray);
$Decendents= $c->get_number_of_descendants($offspringArray);

//Testing, It will out put what is being generated. 
echo "<strong>Testing the create_offspring method. If Successful, you should see an array in the next line</strong><br/>";
print_r($offspringArray);
echo "<br/><strong>Testing the get_parent method. If successful, you should see the parent at specified index ($childIndex), if no child exists at that index you will recieve an error:</strong> ";
print_r($Parent);
echo "<br/><strong>Testing the get_children method. If successful, you should see the children of the specified parent ($animal), if no child exists of that parent you will recieve an error:</strong> ";
print_r ($Children);
echo "<br/> <strong>Testing the get_number_of_descendants method. You should get the number of decendents per species. If no decendents then you should get 0 next to the species</strong><br/>";
print_r ($Decendents);

?>
</body>
</html>