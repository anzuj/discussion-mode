import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        snackBar: {
            show: false,
            mode: null
        },
        surveyData: [
            {
                question: "Is your performance perceived and valued enough?",
                theme: "Appreciation",
                comments: [
                    {
                        userName: "Frank McAllister",
                        commentText: "Yes, I'm getting lots of positive and constructive feedback from the new weekly meetings",
                        status: "openFF"
                    },
                    {
                        userName: "Timothy Bern",
                        commentText: "It's not explicitly clear, but I think so..?",
                        status: "openFF"
                    },
                    {
                        userName: "Lily Mansion",
                        commentText: "There's been quite a lot of confusion about delegating tasks. Some things that were not supposed to be my responsibility ended up being my responsibility in the last quarter and it's been taken for granted. ",
                        status: "openFF"
                    },
                ]
            },
            {
                question: "Is the team spirit right?",
                theme: "Team",
                questionSetId: "",
                order: 2,
                comments: [
                    {
                        userName: "Marco Leipzig",
                        commentText: "I adore my team, can't wait to get to work every morning!",
                        status: "openFF"
                    },
                    {
                        userName: "Marie Uster",
                        commentText: "It's been going downhill as customer support can't cope with the volumes",
                        status: "openFF"
                    },
                ]
            },
            {
                question: "How well do we deal with organizational changes?",
                theme: "Change",
                questionSetId: "",
                order: 3,
                comments: [
                    {
                        userName: "Marco Leipzig",
                        commentText: "I feel the \"startup\" family vibe we had last year is disappearing now that our volumes increase. The team feeling we used to have is not as strong anymore, since numbers seem more important than people. Perhaps some more recreational team events would be handy, or a better communication about how the management intends to cope with the extra work load.",
                        status: "openFF"
                    },
                    {
                        userName: "Alaska Edwards",
                        commentText: "I was really impressed how quickly home office routine was established around Covid-19 peak.",
                        status: "openFF"
                    },
                    {
                        userName: "Maria Ferrera",
                        commentText: "Onboarding of customer support could perhaps cover a few more topics about the work flow. At the moment the amount of new people making \"basic\" mistakes affects productivity of existing members of staff",
                        status: "openFF"
                    },
                ]
            },
            {
                question: "Does your supervisor offer you the support you need to do your job optimally?",
                theme: "Support",
                questionSetId: "",
                order: 4,
                comments: [
                    {
                        userName: "Maria Ferrera",
                        commentText: "Absolutely, Carlos is the best! It's not often you can consider your team lead your friend or someone you'd invite to your birthday party, but he definitely is one of those.",
                        status: "openFF"
                    },
                    {
                        userName: "Latrice Royale",
                        commentText: "My team lead does what she can with the resources that have been given to her. Some tools we work with are awfully outdated, but due to budget cuts there's nothing she directly can affect.",
                        status: "openFF"
                    }
                ]
            },
        ],
        tasks: [
            {
                originatedFrom: [
                  {
                    question: "Would you recommend our company as an employer?",
                    questionComment:
                      "At the moment, no. Scheduling is unfortunately quite chaotic, and it's not clear how vacations are currently scheduled",
                    questionCommentFrom: "Maria Lamore"
                  }
                ],
                title: "Open transparent scheduling",
                delegatedTo: "Manila Luzon",
                deadline: new Date("2020-08-16"),
                taskComments: [
                  {
                    comment: "Oh, finally!",
                    commentBy: "Nicholas Flamel",
                    time: new Date("2020-05-01")
                  },
                  {
                    comment: "How early will we be able to book vacations?",
                    commentBy: "Katy Bell",
                    time: new Date("2020-05-06")
                  }
                ],
                status: "open"
              },
        ],
        escalatedTasks: [],
        achievementTasks: [
            {
                originatedFrom: [
                  {
                    question: "Are coping well with change?",
                    questionComment:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    questionCommentFrom: "Maria Lamore"
                  }
                ],
                title: "Hire a wellness coach",
                delegatedTo: "Manila Luzon",
                deadline: new Date("2020-02-16"),
                taskComments: [
                  {
                    comment: "Good idea!",
                    commentBy: "Nicholas Flamel",
                    time: new Date("2020-05-01")
                  },
                  {
                    comment: "Is it manageable this quarter though?",
                    commentBy: "Katy Bell",
                    time: new Date("2020-05-06")
                  }
                ],
                status: "closed"
              },
              {
                originatedFrom: [
                  {
                    question: "Is the Team spirit right?",
                    questionComment:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    questionCommentFrom: "Maria Lamore"
                  }
                ],
                title: "Delegate projects on subsidiary",
                delegatedTo: "Latrice Royale",
                deadline: new Date(),
                taskComments: [
                  {
                    comment: "Good idea!",
                    commentBy: "Nicholas Flamel",
                    time: new Date("2020-05-01")
                  },
                  {
                    comment: "Is it manageable this quarter though?",
                    commentBy: "Katy Bell",
                    time: new Date("2020-05-01")
                  }
                ],
                status: "closed"
              },
              {
                originatedFrom: [
                  {
                    question: "Is the Team spirit right?",
                    questionComment:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    questionCommentFrom: "Maria Lamore"
                  }
                ],
                title: "Build automated schedule editor",
                delegatedTo: "Alyssa Edwards",
                deadline: new Date(),
                taskComments: [],
                status: "closed"
              },
        ],
        teamMembers: [
            "Test User",
            "Alyssa Edwards",
            "Chad Michaels",
            "Coco Montrese",
            "Latrice Royale",
            "Sherlock Holmes",
            "Bianca Del Rio",
            "Manila Luzon",
            "Alexis Mateo",
            "Jinkx Monsoon",
            "Nico Monsoon"
        ],
        admins: [
            "Admin 1",
            "Admin 2",
            "Admin 3",
        ]

    },

    mutations: {
        //used in Intro.vue
        changeSurveyOrder(state,value){
            //just return if value is not an array
            if(!value.length){
                return
            } //update surveyData order
            state.surveyData = value;
        },
        addTask(state, taskObj) {
            state.tasks.push(taskObj)
        },
        //should also remove that task from general task array
        addEscalatedTask(state, taskObj) {
            state.escalatedTasks.push(taskObj)
        },
        changeTask(state, [newStatus, taskId]) {
            let currTask = state.tasks.find(task => task.id === taskId);
            currTask.status = newStatus;
        },
        changeDueDate(state, [newDate, taskId]) {
            let currTask = state.tasks.find(task => task.id === taskId);
            currTask.deadline = newDate;
        },
        changePerson(state, [newPerson, taskId]) {
            let currTask = state.tasks.find(task => task.id === taskId);
            currTask.delegatedTo = newPerson;
        },
        addComment(state, [newComment, taskId]) {
            let currTask = state.tasks.find(task => task.id === taskId)
            currTask.taskComments.push(newComment)
        },
        changeFF(state, [surveyQuestion, user, text, newStatus]) {
            //from OpenFeedforward receives current question, userName and commentText 
            let currQuestion = state.surveyData.find(question => question.question === surveyQuestion);
            let ff = currQuestion.comments.find(comment => comment.userName === user && comment.commentText === text);
            ff.status = newStatus;
        },
        changeSnackStatus(state, [newSnackStatus, newMode]){
            state.snackBar.show = newSnackStatus;
            state.snackBar.mode = newMode
        },

    },

    actions: {
        changeFF(context, [surveyQuestion, user, text, newStatus]) {
            context.commit("changeFF", [surveyQuestion, user, text, newStatus])
        },
        addTask(context, taskObj) {
            context.commit("addTask", taskObj)
        },
        addEscalatedTask(context, taskObj) {
            context.commit("addEscalatedTask", taskObj)
        },
        changeTask(context, [newStatus, taskId]) {
            context.commit("changeTask", [newStatus, taskId])
        },
        changeDueDate(context, [newDate, taskId]) {
            context.commit("changeDueDate", [newDate, taskId])
        },
        changePerson(context, [newPerson, taskId]) {
            context.commit("changePerson", [newPerson, taskId])
        },
        addComment(context, [newComment, taskId]) {
            context.commit("addComment", [newComment, taskId])
        },
        showSnack(context, [isSnackShown, mode]) {
            context.commit("changeSnackStatus", [isSnackShown, mode])
        },

    },

    getters: {
        //get Open Feedforwards from a current theme within Discussion flow
        getOpenFF: (state) => (currentTheme) => {
            // extract question data for that topic
            let arr = state.surveyData.filter(question => question.theme === currentTheme);
            //extract open Feedforwards for that topic
            return arr[0].comments.filter(comment => comment.status === "openFF")

        },

        //get closed Feedforwards from a current theme within Discussion flow
        getClosedFF: (state) => (currentTheme) => {
            // extract question data for that topic
            let arr = state.surveyData.filter(question => question.theme === currentTheme);
            //extract closed Feedforwards for that topic
            return arr[0].comments.filter(comment => comment.status === "closedFF")
        },

        //get tasks for a current theme within Discussion flow
        getOpenTasks: (state) => (currentQuestion) => {
            return state.tasks.filter(task => task.originatedFrom[0].question === currentQuestion && task.status === "open");

        },
    },
    strict: true
})