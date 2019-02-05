<?php
ini_set('max_execution_time', 0); 


$sourceDir = "./images/screenshots/large/";
$destDir = "./images/screenshots/medium/";

$files = scandir($sourceDir);
foreach($files as $filename) {
	$file = $sourceDir.$filename;
	$ext = pathinfo($filename, PATHINFO_EXTENSION);
	
	if(strtoupper($ext) == "JPEG" || strtoupper($ext) == "JPG"){
		$newFile = $destDir.$filename;
		copy($file, $newFile);
		resize_image($newFile, 1280, 720);
	}
	
}

function resize_image($file, $w, $h, $crop=FALSE) {
    list($width, $height) = getimagesize($file);
    $r = $width / $height;
    if ($crop) {
        if ($width > $height) {
            $width = ceil($width-($width*abs($r-$w/$h)));
        } else {
            $height = ceil($height-($height*abs($r-$w/$h)));
        }
        $newwidth = $w;
        $newheight = $h;
    } else {
        if ($w/$h > $r) {
            $newwidth = $h*$r;
            $newheight = $h;
        } else {
            $newheight = $w/$r;
            $newwidth = $w;
        }
    }
    $src = imagecreatefromjpeg($file);
    $dst = imagecreatetruecolor($newwidth, $newheight);
    imagecopyresampled($dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

    imagejpeg($dst, $file);
}