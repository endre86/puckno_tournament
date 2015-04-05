<?php
function Best2WR($Best, $Level, $bronze)
{
	# Define scales and minumum scores for the winner, for the different levels:
	$scales = Array(0.96, 0.92, 0.89, 0.83, 0.6, 0.4);
	$maxpoints = Array(1000, 500, 100, 70, 40, 20);
	# Sort the input array of best scores
	sort($Best);
	# Get the length of $Best and define the output array of scores:
    $LengthBest = sizeof($Best);
    $WR = array_fill(0, $LengthBest, 0);
    # Variables used in the calculation (see below):
    $P1 = 0;
    $P2 = 0;
    $P3 = 0;
    $Startpos = 0;
    $Length = 0;
    
    echo 'Best: ' . implode(', ', $Best);
    echo '<br>Level: ' . $Level . '<br><br>';

    # If less than 4 players participate, no points are handed out:
    if($LengthBest < 4)
    {
 		return $WR;
 	}
 	
 	# Run through the best scores and calculate the WR-points:
	for($i = 0; $i < $LengthBest; ++$i)
	{
		# The players are given a mimimum of << 1, 2, ... , $LengthBest >> points:
		$P1 = $i + 1;
		# The players are given a mimimum of << $maxpoints/2^($LengthBest-1), $maxpoints/2^($LengthBest-2), ... , $maxpoints/2^0 >> points:
		$P2 = floor($maxpoints[$Level-1] / (pow(2, $LengthBest-$i-1) ));
		# Update start position and length of the subset of best scores used to calculate the scores:
		$Startpos = max(0,$i-3);
		$Length=$i-$Startpos+1;

		$_best = array_slice($Best, $Startpos, $Length);
		$_sum = array_sum($_best);
		$P3 = round($scales[$Level-1] * $_sum / 4);
		$WR[$i] = max($P1, $P2, $P3);
	}

	// print_r($WR);
	# The last place is always given only one point:
	$WR[0] = 1;
	$WR = array_reverse($WR);

	# The first place is added 10 points:
	$WR[0] = $WR[0] + 10;
	
	print_r($WR);

	# Average the points for 3. and 4. place if the bronze match is not played:
	if(!$bronze && $LengthBest>3)
	{
		$br = floor(($WR[2]+$WR[3])/2);
		$WR[2] = $br;
		$WR[3] = $br;
	}
	
	return $WR;
}

# Example, which is Bergensliga # 17 vaar 2012:
$Best = Array(604, 568, 268, 282, 219, 160, 174);
// $res = call_user_func_array('Best2WR', array($Best, 5, true));
// echo implode(', ', $res);
echo '<hr>';
$res = call_user_func_array('Best2WR', array($Best, 5, false));
echo implode(', ', $res);
?>