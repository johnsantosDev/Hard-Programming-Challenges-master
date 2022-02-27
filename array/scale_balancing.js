/****************************************************************
 *             CODERBYTE SCALE BALANCING CHALLENGE              *
 *                                                              *
 * Problem Statement                                            *
 * Have the function ScaleBalancing(strArr) read strArr which   *
 * will contain two elements, the first being the two positive  *
 * integer weights on a balance scale (left and right sides)    *
 * and the second element being a list of available weights as  *
 * positive integers. Your goal is to determine if you can      *
 * balance the scale by using the least amount of weights from  *
 * the list, but using at most only 2 weights.                  *
 *                                                              *
 * For example: if strArr is ["[5, 9]", "[1, 2, 6, 7]"] then    *
 * this means there is a balance scale with a weight of 5 on    *
 * the left side and 9 on the right side. It is in fact         *
 * possible to balance this scale by adding a 6 to the left     *
 * side from the list of weights and adding a 2 to the right    *
 * side. Both scales will now equal 11 and they are perfectly   *
 * balanced.                                                    *
 *                                                              *
 * Your program should return a comma separated string of the   *
 * weights that were used from the list in ascending order,     *
 * so for this example your code should return the string 2,6   *
 *                                                              *
 * There will only ever be one unique solution and the list of  *
 * available weights will not be empty. It is also possible to  *
 * add two weights to only one side of the scale to balance it. *
 * If it is not possible to balance the scale then your program *
 * should return the string not possible.                       *
 *                                                              *
 * Examples                                                     *
 * Input 1: ["[3, 4]", "[1, 2, 7, 7]"]                          *
 * Output 1: 1                                                  *
 *                                                              *
 * Input 2: ["[13, 4]", "[1, 2, 3, 6, 14]"]                     *
 * Output 2: 3,6                                                *
 *                                                              *
 ***************************************************************/
 
function isWeightEqual( right_side_weights, p , j ) {
        if( right_side_weights[j] == 0 ) {
                return right_side_weights[p];
        }
        else if ( right_side_weights[p] == 0 ) {
                return right_side_weights[j];
        }
        else {
                return ( right_side_weights[j] + "," + right_side_weights[p] )
                                                                        .split(",")
                                                                        .sort()
                                                                        .join(",");
        }
}

function ScaleBalancing( str ) { 

        let left_side_weights = [];
        let right_side_weights = [];
        let weights_combination = [];
        let temp = [];
        
        left_side_weights = str[0]
                                .slice(1)
                                .slice(0, str[0].length-2)
                                .split(",")
                                .map( n => parseInt(n) );
        right_side_weights = str[1]
                                .slice(1)
                                .slice(0, str[1].length-2)
                                .split(",")
                                .map( n => parseInt(n) );
        
        //PUSH 0 VALUE AT FIRST ARRAY INDEX
        if( right_side_weights[0] != 0 ) {
                right_side_weights.unshift(0);
        }
        
        
        for( let i=0; i<left_side_weights.length; i++ ) {
                temp = [];
                for( let j=0; j<right_side_weights.length; j++ ) {
                        temp.push( left_side_weights[i] + right_side_weights[j] );
                }
                weights_combination.push(temp);
                temp = [];
                for( let j=0; j<right_side_weights.length; j++ ) {
                        temp.push( left_side_weights[i] - right_side_weights[j] );
                }
                weights_combination.push(temp);
        }
        
         
        for( let i=0; i<weights_combination.length-2; i++ ) {
                for( let j=0; j<weights_combination[i].length; j++ ) {
                        for( let k=weights_combination.length-2; k<weights_combination.length; k++ ) {
                                for( let p=0; p<weights_combination[k].length; p++ ) {
                                        if( weights_combination[i][j] == weights_combination[k][p] && j!=p ) {
                                                if( i%2==0 && k%2==0 ) {
                                                        if( left_side_weights[0] + right_side_weights[j] == left_side_weights[1] + right_side_weights[p] ) {
                                                                return isWeightEqual( right_side_weights, p , j );
                                                        }
                                                } 
                                                else if( i%2==0 && k%2!=0 ) {
                                                        if( left_side_weights[0] + right_side_weights[j] == left_side_weights[1] - right_side_weights[p] ) {
                                                                return isWeightEqual( right_side_weights, p , j );
                                                        }
                                                }
                                                else if( i%2!=0 && k%2==0 ) {
                                                        if( left_side_weights[0] - right_side_weights[j] == left_side_weights[1] + right_side_weights[p] ) {
                                                                return isWeightEqual( right_side_weights, p , j );
                                                        }
                                                } 
                                                else {
                                                        if( left_side_weights[0] - right_side_weights[j] == left_side_weights[1] - right_side_weights[p] ) {
                                                                return isWeightEqual( right_side_weights, p , j );
                                                        }
                                                }
                                        }
                                }
                        }
                }
        }

        return "not possible";

}
         
// KEEP THIS FUNCTION CALL HERE
console.log(ScaleBalancing(readline()));