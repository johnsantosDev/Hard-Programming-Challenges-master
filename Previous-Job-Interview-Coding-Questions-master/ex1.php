<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>The Factor Machine</title>
</head>
<body>
<?php 
	/*This program will calculate the factors of a number $a.
	The a is an arebitrary number, feel free to change it and see its factors. To make this program more useable, I could have had a form element to let the user write their own number */
	$a=565454;
	$array_placeholder=0;
	$result=array(); //declaring results array
	echo "<b>Welcome to the factor calculator</b> <br><br>";
	echo "The factors of $a are as follows: <br>";
	for($i=2;$i<$a;$i++)
	{
		if($a%$i==0) //Loops from i to a not including a and checks to see if when a is divided by i the remainder is 0. then we know it is a factor and it is
					//outputed to the user
		{	
			$result[$array_placeholder]=$i;
			$array_placeholder++;
			echo "$i<br/>";
		}
	}
	if($array_placeholder==0)
	{
		echo "$a (It seems that the only factor of $a is $a)";	
	}
?>
</body>
</html>