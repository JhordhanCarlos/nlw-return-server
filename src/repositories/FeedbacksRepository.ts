export interface FeedbackCreateData{
    type: String,
    comment: String,
    screenshot?: String
}

export interface FeedbacksRepository{
    create : (data:FeedbackCreateData) => void;
}