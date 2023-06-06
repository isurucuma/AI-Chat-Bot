// typical message type
// TODO fields set to optional but change them to required in production
export interface IMessage {
    id?: number;
    content?: string;
    isFromUser?: boolean;
    done?: boolean;
}

export enum NavSelection {
    knowledgeBase,
    activity,
    keys,
}
