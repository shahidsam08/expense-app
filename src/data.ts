export enum ReportType { 
  INCOME = 'income',
  EXPENSE = 'expense'

}


export const data: Data = {

  report: [{
    id: 'uuid1', 
    source : "game",
    amount : 7999,
    created_at: new Date(),
    updated_at: new Date(),
    type: ReportType.INCOME
  },
  {
    id: 'uuid2', 
    source : "Youtbe",
    amount : 5600,
    created_at: new Date(),
    updated_at: new Date(),
    type: ReportType.INCOME
  },
  {
    id: 'uuid3', 
    source : "programming",
    amount : 5000,
    created_at: new Date(),
    updated_at: new Date(),
    type: ReportType.EXPENSE
  }
]
  
}


interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: ReportType
  }[]
}

