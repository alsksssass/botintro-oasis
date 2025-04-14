import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { CommandIcon, Gamepad2, Users, Activity, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // 샘플 통계 데이터 (실제로는 Supabase에서 불러옴)
  const stats = [
    {
      title: '명령어',
      value: '35',
      description: '등록된 봇 명령어 수',
      icon: <CommandIcon className="h-6 w-6 text-primary" />,
      link: '/dashboard/commands'
    },
    {
      title: '게임 테마',
      value: '12',
      description: '출시된 테마 수',
      icon: <Gamepad2 className="h-6 w-6 text-primary" />,
      link: '/dashboard/themes'
    },
    {
      title: '사용자',
      value: '147',
      description: '가입한 사용자 수',
      icon: <Users className="h-6 w-6 text-primary" />,
      link: '/dashboard/users'
    },
    {
      title: '활동 기록',
      value: '3.8K',
      description: '총 명령어 실행 횟수',
      icon: <Activity className="h-6 w-6 text-primary" />,
      link: '#'
    },
  ];

  // 최근 활동 내역 (샘플 데이터)
  const activities = [
    {
      id: 1,
      action: '명령어 추가',
      detail: 'poll',
      timestamp: '2시간 전',
      user: '관리자'
    },
    {
      id: 2,
      action: '테마 수정',
      detail: 'Cyberpunk 2077',
      timestamp: '5시간 전',
      user: '관리자'
    },
    {
      id: 3,
      action: '권한 변경',
      detail: '모더레이터 역할',
      timestamp: '1일 전',
      user: '관리자'
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">대시보드</h1>
          <p className="text-muted-foreground">{user?.displayName}님, 환영합니다!</p>
        </div>
      </div>

      {/* 통계 카드 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Link to={stat.link} key={index} className="block">
            <Card className="card-hover">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* 봇 상태 및 최근 활동 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 봇 상태 카드 */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">봇 상태</CardTitle>
            <CardDescription>현재 봇 상태 및 성능</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="glass w-16 h-16 rounded-full flex items-center justify-center">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-semibold flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  온라인
                </p>
                <p className="text-sm text-muted-foreground">핑: 42ms</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <p className="text-muted-foreground">업타임</p>
                <p className="font-medium">99.9%</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-muted-foreground">서버 수</p>
                <p className="font-medium">128</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-muted-foreground">활성 사용자</p>
                <p className="font-medium">2,548명</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-muted-foreground">메모리 사용량</p>
                <p className="font-medium">512MB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 최근 활동 카드 */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">최근 활동</CardTitle>
            <CardDescription>관리자들이 수행한 최근 작업</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{' '}
                      <span className="text-muted-foreground">{activity.action}</span>{' '}
                      <span className="font-medium">{activity.detail}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
