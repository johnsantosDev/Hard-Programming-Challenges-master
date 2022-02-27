<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExampleQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('example_questions', function (Blueprint $table) {
            $table->id();
            $table->string('exampleQuestion');
            $table->timestamps();
        });

        DB::table('example_questions')->insert([
            [
                'exampleQuestion' => 'What is the meaning of life?'
            ],
            [
                'exampleQuestion' => 'Why are people so afraid of change?'
            ],
            [
                'exampleQuestion' => 'Is a veggie dog a sandwich? Why or why not?'
            ],
            [
                'exampleQuestion' => 'What\'s your favorite programming language?'
            ],
            [
                'exampleQuestion' => 'If you could have one superpower, what would it be and why?'
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('example_questions');
    }
}
