<?php 

if(isset($_FILES['file']) and !$_FILES['file']['error']){
    $fname = "11" . ".webm";

    move_uploaded_file($_FILES['file']['tmp_name'], "../videos/" . $fname);
}
?>