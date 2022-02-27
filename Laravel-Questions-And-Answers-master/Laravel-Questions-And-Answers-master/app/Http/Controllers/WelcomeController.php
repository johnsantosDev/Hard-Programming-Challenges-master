<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\ExampleQuestion;
use App\Answer;

class WelcomeController extends Controller
{
    public function index() {
        $questions = Question::orderBy('id', 'desc')->get();
        $exampleQuestion = ExampleQuestion::all()->random();
        $answers = Answer::all();

        return view('welcome.index', [
            'questions' => $questions,
            'exampleQuestion' => $exampleQuestion,
            'answers' => $answers->toArray()
        ]);
    }
    
    public function store() {
        $inputQuestion = request('question');

        if(strlen($inputQuestion) > 5 and substr($inputQuestion, -1) == '?') {
            $question = new Question();

            $question->question = $inputQuestion;

            $question->save();

            $questionID = Question::orderBy('id', 'desc')->first()->id;
        
            return redirect()->action(
                'QuestionsController@show', ['id' => $questionID]
            );
        }
        else {
            return redirect('/')->with('text', $inputQuestion);
        }
    }
}
