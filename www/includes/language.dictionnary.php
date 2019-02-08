<?php
/*variables $langDictionnary  & $locale comes from index.php*/
if($lang == null || $lang == ""){
	$locale = $default_language;
} else {
	switch (strtolower($lang)) {
		case "fr":
		case "en":
			$locale = strtolower($lang);
			break;
		default:
			$locale = $default_language;
			break;
	}
}


$fileContent = file_get_contents("./data/$locale.json");
$langDictionnary  = json_decode($fileContent, true);
?>