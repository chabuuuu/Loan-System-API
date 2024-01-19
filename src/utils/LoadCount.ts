export class Load_Count{
    static count = 0;
    get(){
        return Load_Count.count;
    }
    increase(){
        Load_Count.count++;
    }
}