/*
 * This was borrowed from Big Spaceship's MathUtils.as file.
 * I could have written these myself, but big props for the time savings.
 * Aaron Sherrill
 * Digital Surgeons
 * http://www.digitalsurgeons.com/
 */
function normalize($value, $min, $max){
	return ($value - $min) / ($max - $min);
}
	
function interpolate($normValue, $min, $max){
	return $min + ($max - $min) * $normValue;
}
		
function map($value, $min1, $max1, $min2, $max2){
	return interpolate( normalize($value, $min1, $max1), $min2, $max2);
}
		