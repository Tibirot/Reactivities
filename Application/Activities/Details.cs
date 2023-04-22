using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities;

public abstract class Details
{
    public class Query : IRequest<Result<Activity>>
    {
        public Guid Id { get; init; }
    }

    public class Handler : IRequestHandler<Query, Result<Activity>>
    {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
            _context = context;
            
        }
        public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(new object[] { request.Id }, cancellationToken: cancellationToken);
            return Result<Activity>.Success(activity);
        }
    }
}