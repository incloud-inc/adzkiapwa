export interface PaymentsHistory {
    pid:string,
    trxdate: string,
    paket: PaymentsHistoryPackage,
    transaction_id:string,
    amount:string,
    payment_gateway:string,
    paid_date:string,
    payment_status:string,
    gid:string,
}
export interface PaymentDetail{
    status: boolean,
    message?: string,
    price?: string,
    group_name?: string,
    group_description?: string,
    qr_code?: string,
}
export interface TrxGopay{
    pid?: number,
    status?: boolean,
    group?: any,
    message?: any,
}
export interface PaymentsHistoryPackage {
    group_name: string,
    price:string
}
export interface GroupList{
    available: boolean,
    description: string,
    gid: string,
    group_name: string,
    price: string,
    valid_for_days: string,
}
export interface GroupDetail{
    gid?: string,
    group_name?: string,
    price?: string,
    valid_for_days?: string,
    description?: string,
    result?:any
}
export interface LessonList{
    stid: string,
    title: string,
    study_description?: string,
    gids: string,
    created_date: string,
    created_by: string,
    attachment?: string,
    category_name: string,
}
export interface QuizList{
    quid: string,
    quiz_name: string,
    description?: string,
    start_date?: string,
    end_date?: string,
    gids: string,
    qids: string,
    noq?: string,
    correct_score: string,
    incorrect_score: string,
    ip_address?: string,
    duration: string,
    maximum_attempts: string,
    pass_percentage: string,
    view_answer?: string,
    camera_req?: string,
    question_selection?: string,
    gen_certificate?: string,
    certificate_text?: string,
    with_login?: string,
    quiz_template?: string,
    uids: string,
    inserted_by?: string,
    inserted_by_name?: string,
    show_chart_rank?: string,
    quiz_price?: string
}
export interface QuizAttempt{
    saved_answers?: any[],
    seconds?:Number,
    selected_lang?:Number,
    title?:string,
    options?:QuizAttemptOptions[]
    questions?:QuizAttemptQuestions[]
    quiz?:QuizAttempQuiz
}
export interface QuizAttemptOptions{
    oid?: string,
    qid?: string,
    q_option?: string,
    q_option_match?: string,
    q_option1?: string,
    score?: string,
    oq_option_match1id?: string
}
export interface QuizAttemptQuestions{
    qid?: string,
    question_type?: string,
    question?: string,
    description?: string,
    question1?: string,
    description1?: string,
    cid?: string,
    lid?: string,
    no_time_served?: string,
    no_time_corrected?: string,
    no_time_incorrected?: string,
    no_time_unattempted?: string,
    inserted_by?: string,
    inserted_by_name?: string,
    paragraph?: string,
    paragraph1?: string,
    parent_id?: string,
    category_name?: string,
    level_name?: string
}
export interface QuizAttempQuiz{
    rid?: string,
    quid?: string,
    uid?: string,
    result_status?: string,
    start_time?: string,
    end_time?: string,
    categories?: string,
    category_range?: string,
    r_qids?: string,
    individual_time?: string,
    total_time?: string,
    score_obtained?: string,
    percentage_obtained?: string,
    attempted_ip?: string,
    score_individual?: string,
    photo?: string,
    manual_valuation?: string,
    quiz_name?: string,
    description?: string,
    start_date?: string,
    end_date?: string,
    gids?: string,
    qids?: string,
    noq?: string,
    correct_score?: string,
    incorrect_score?: string,
    ip_address?: string,
    duration?: string,
    maximum_attempts?: string,
    pass_percentage?: string,
    view_answer?: string,
    camera_req?: string,
    question_selection?: string,
    gen_certificate?: string,
    certificate_text?: string,
    with_login?: string,
    quiz_template?: string,
    uids?: string,
    inserted_by?: string,
    inserted_by_name?: string,
    show_chart_rank?: string,
    quiz_price?: string
}
export interface QuizAnswer{
    AnswerIndex: number,
    qid:string,
    Answer:string,
    AnswerStatus:string,
}
export interface QuizResultList{
    quiz_total: number,
    trial_count_total:number,
    average:number,
    quizzes:QuizResultDetail[],
}
export interface QuizResultDetail{
    name: string,
    result_status:string,
    total_time:string,
    score:number,
    rid:string,
}