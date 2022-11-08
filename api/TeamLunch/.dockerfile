FROM mcr.microsoft.com/dotnet/core/sdk:6.0 AS build-env
COPY . /app
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://*:8080
ENTRYPOINT ["dotnet", "TeamLunch.dll"]