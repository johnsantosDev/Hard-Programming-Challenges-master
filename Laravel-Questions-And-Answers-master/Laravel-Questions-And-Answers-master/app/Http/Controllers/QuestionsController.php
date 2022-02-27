<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Answer;

class QuestionsController extends Controller
{
    public function show($id) {
        $question = Question::findOrFail($id);
        $answers = Question::find($id)->answers;

        return view('questions.show', [
            'question' => $question,
            'answers' => $answers
        ]);
    }
    
    public function store($question_id) {
        $inputAnswer = request('answer');

        if(strlen($inputAnswer) > 4) {
            $answer = new Answer();

            $answer->answer = $inputAnswer;
            $answer->question_id = $question_id;

            $answer->save();
        
            return redirect()->action(
                'QuestionsController@show', ['id' => $question_id]
            );
        }
        else {
            return redirect()->action(
                'QuestionsController@show', ['id' => $question_id])->with('text', $inputAnswer
            );
        }
    }
}
