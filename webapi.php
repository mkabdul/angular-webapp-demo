<?php
$curl = curl_init();
$start = (int)$_REQUEST["start"];
$limit = (int)$_REQUEST["limit"];
$url = "https://www.experiencesiouxfalls.com/export/directory-items/";
curl_setopt_array($curl, array(
	CURLOPT_URL => $url,
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_FOLLOWLOCATION => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => array(
	),
));
$response = curl_exec($curl);
$err = curl_error($curl);
$reslist = [];
curl_close($curl);
if ($err) {
	echo "[]";
} else {
 $rows = json_decode($response);
 $rowList = [];
 $count = 0;
 foreach($rows as $key => $row) {
     if ($start <= (int)$key && $count < $limit) {
        $rowList[] = array(
        "title"=> $row->title,
        "di_image" => $row->di_image,
        "entry_id" => $row->entry_id
        );   
        $count++;
     }
 }
 echo json_encode($rowList);
}
?>