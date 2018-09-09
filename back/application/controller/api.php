<?php

/**
 * Class Songs
 * This is a demo class.
 *
 * Please note:
 * Don't use the same name for class and method, as this might trigger an (unintended) __construct of the class.
 * This is really weird behaviour, but documented here: http://php.net/manual/en/language.oop5.decon.php
 *
 */
 error_reporting(E_ERROR | E_PARSE);
class Api extends Controller
{
    /**
     * PAGE: index
     * This method handles what happens when you move to http://yourproject/songs/index
     */
    public function index()
    {
        // getting all songs and amount of songs
     //   $songs = $this->model->getAllSongs();
     //   $amount_of_songs = $this->model->getAmountOfSongs();

       // load views. within the views we can echo out $songs and $amount_of_songs easily
        //require APP . 'view/_templates/header.php';
        $songs =$this->model->getAllSongs();

		$outp = "";

		
           foreach ($songs as $song) { 
			
			    if ($outp != "") {$outp .= ",";}
					$outp .= '{"id":"'  . $song->id . '",';
					$outp .= '"artist":"'   . $song->artist . '",';
					$outp .= '"link":"'   . $song->link . '",';		
					$outp .= '"stock":"'   . $song->stock . '",';
					$outp .= '"price":"'   . $song->price . '",';						
					$outp .= '"track":"'. $song->track . '"}';			

             } 		
		
		$outp ='{"records":['.$outp.']}';
		echo $outp;
       // require APP . 'view/_templates/footer.php';
    }



	
    public function searchbyid($id)
    {
        $songs =$this->model->getSong($id);

		$outp = "";

		
          
			
			  
					$outp .= '{"id":"'  . $songs->id . '",';
					$outp .= '"artist":"'   . $songs->artist . '",';
					$outp .= '"link":"'   . $songs->link . '",';	
					$outp .= '"stock":"'   . $songs->stock . '",';
					$outp .= '"price":"'   . $songs->price . '",';					
					$outp .= '"track":"'. $songs->track . '"}';			
	
		
		$outp =$outp;
		echo $outp;
    }	
	
}
