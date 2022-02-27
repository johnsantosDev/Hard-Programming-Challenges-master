@extends('layouts.layout')

@section('content')
<h1 class="text-center my-5">
    <a href="{{ route('welcome.index') }}" class="text-dark">
        Answers
    </a>
</h1>

<div class="container">
    <div class="col-lg-6 offset-lg-3">
        <h3>Question: {{ $question->question }}</h3>
    </div>
        
    <div class="col-lg-6 offset-lg-3">
        <div class="font-weight-bold text-center">Answers:</div>
        
        @if (count($answers) === 0)
            <p class="border-bottom pb-3">
                No answers found. You can be the first one to answer by using the text box below!
            </p>
        @else
            @foreach($answers as $answer)
                <h4 class="border-bottom pb-3">
                    {{ $answer->answer }}
                </h4>
            @endforeach
        @endif
        
        <a href="{{ route('welcome.index') }}">Back to Questions</a>

        <form class="pb-4" action="{{ route('questions.store', [$question->id]) }}" method="POST">
            @csrf
                <div class="form-group">
                    <label>Answer this question (answers must be at least 5 characters long):</label>
                    <textarea name="answer" class="form-control">{{ session('text') }}</textarea>
                </div>

                <div class="text-right">
                    <button class="btn btn-primary" type="submit">
                        Answer Question
                    </button>
                </div>
            </form>
    </div>
</div>
@endsection
